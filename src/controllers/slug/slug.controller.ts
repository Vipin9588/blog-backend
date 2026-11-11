import { newSlug, getSlug } from "#/models/slug/slug.model.js";
import { slugify, validateSlug } from "#/helpers/blog/slugGenrate.js";
import { Prisma } from "#/generated/prisma/client.js";

const generateOrGetSlug = async (title: string): Promise<number> => {
    const slug = validateSlug(slugify(title));

    try {
        const existingSlugId = await getSlug(slug);

        if (existingSlugId !== null) {
            return existingSlugId;
        }
        return await newSlug(slug);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            const existingSlugId = await getSlug(slug);

            if (existingSlugId !== null) {
                return existingSlugId;
            }
        }
        throw new Error("Failed to generate slug", {
            cause: error
        });
    }
};

export default generateOrGetSlug;