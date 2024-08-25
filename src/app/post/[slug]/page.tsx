import { Metadata, ResolvingMetadata } from "next";
import { getItemBySlug } from "@/utils/actions/get-data";
import { Postprops } from "@/utils/post.type";
import { Hero } from "@/components/hero";
import styles from "./styles.module.scss";
import { Phone } from "lucide-react";
import { Container } from "@/components/container";
import Image from "next/image";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { objects }: Postprops = await getItemBySlug(slug);

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `DevMotors - ${objects[0].title}`,
      description: objects[0].metadata.description.text,
      openGraph: {
        title: `DevMotors - ${objects[0].title}`,
        images: [objects[0].metadata.banner.url, ...previousImages],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (err) {
    console.error("Failed to generate metadata:", err);
    return {
      title: "DevMotors - Sua oficina especializada",
      description: "Oficina de carros Pernambuco",
    };
  }
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const { objects }: Postprops = await getItemBySlug(slug);

    if (!objects || objects.length === 0) {
      return <div>No data found.</div>;
    }

    const post = objects[0];
    const { title, metadata } = post;
    const { button, banner, description } = metadata;

    return (
      <>
        <Hero
          heading={title}
          buttonTitle={button.title}
          buttonUrl={button.url}
          bannerUrl={banner.url}
          icon={<Phone size={24} color="#fff" />}
        />
        <Container>
          <section className={styles.about}>
            <article className={styles.innerAbout}>
              <h1 className={styles.title}>{description.title}</h1>
              <p>{description.text}</p>

              {description.button_active && description.button_url && (
                <a
                  className={styles.link}
                  href={description.button_url}
                  target="_blank"
                >
                  {description.button_title}
                </a>
              )}
            </article>

            <div className={styles.bannerAbout}>
              <Image
                className={styles.imageAbout}
                alt={title}
                quality={100}
                fill={true}
                priority={true}
                src={description.banner.url}
              />
            </div>
          </section>
        </Container>
      </>
    );
  } catch (err) {
    console.error("Failed to load page data:", err);
    return <div>Error loading page.</div>;
  }
}
