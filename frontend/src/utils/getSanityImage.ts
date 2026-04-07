import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { client } from "../data/sanity/client";

interface Props {
	node: { ref: string };
	width?: number;
}

export function getSanityImage({ node, width = 960 }: Props) {
	const builder = imageUrlBuilder(client);

	let image: ImageUrlBuilder | undefined;

	// See https://www.sanity.io/docs/presenting-images for general documentation on
	// presenting images, and https://www.sanity.io/docs/image-url for specifics on
	// this builder API
	try {
		if (node.ref) {
			image = builder.image(node.ref).width(width).fit("crop").auto("format");
		}
	} catch (error) {
		console.error(error);
	}

	return image;
}
