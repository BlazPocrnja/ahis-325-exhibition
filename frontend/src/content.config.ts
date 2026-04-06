import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { getAllCreators, getAllHeroes, getAllProducts, getAllEssays } from "./data/sanity";

const products = defineCollection({
	loader: async () => {
		const result = await getAllProducts();
		return result.data;
	},
	schema: z.object({
		_id: z.string(),
		_type: z.string(),
		_createdAt: z.string(),
		_updatedAt: z.string(),
		status: z.string(),
		slug: z.string(),
		name: z.string(),
		publishedAt: z.string().optional(),
		imageWithAlt: z.object({
			ref: z.string(),
			alt: z.string(),
		}),
		videoLink: z.string().nullable().optional(),
		content: z.array(z.unknown()),
		sku: z.string().optional(),
		price: z
			.object({
				amount: z.number(),
				currency: z.string(),
			})
			.optional(),
		creator: reference("creators"),
		order: z.number().nullable().optional()
	}),
});

const creators = defineCollection({
	loader: async () => {
		const result = await getAllCreators();
		return result.data;
	},
	schema: z.object({
		_id: z.string(),
		_type: z.string(),
		_createdAt: z.string(),
		_updatedAt: z.string(),
		status: z.string(),
		slug: z.string(),
		name: z.string(),
		alias: z.string().optional(),
		imageWithAlt: z.object({
			ref: z.string(),
			alt: z.string(),
		}),
		content: z.array(z.unknown()),
		products: z.array(reference("products")),
	}),
});

const artists = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/data/artists" }),
	schema: z.object({
		name: z.string(),
		stage_name: z.string(),
		genre: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
	}),
});

const albums = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/data/albums" }),
	schema: z.object({
		name: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		publishDate: z.date(), // e.g. 2024-09-17
		tracks: z.array(z.string()),
		artist: reference("artists"),
	}),
});

const heroes = defineCollection({
		loader: async () => {
		const result = await getAllHeroes();
		return result.data;
	},
	schema: z.object({
		_id: z.string(),
		_type: z.string(),
		_createdAt: z.string(),
		_updatedAt: z.string(),
		status: z.string(),
		title: z.string(),
		subtitle: z.string().optional(),
		publishedAt: z.string().optional(),
		content: z.array(z.unknown())
	}),
});

const essays = defineCollection({
		loader: async () => {
		const result = await getAllEssays();
		return result.data;
	},
	schema: z.object({
		_id: z.string(),
		_type: z.string(),
		_createdAt: z.string(),
		_updatedAt: z.string(),
		status: z.string(),
		title: z.string(),
		subtitle: z.string().optional(),
		publishedAt: z.string().optional(),
		content: z.array(z.unknown())
	}),
});


// Export all collections
export const collections = { artists, albums, products, creators, heroes, essays };
