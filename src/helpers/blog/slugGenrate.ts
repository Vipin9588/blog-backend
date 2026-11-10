const slugify = (str: string): string => {       // Function to generate a slug from a given string
    if(typeof str !== 'string' || str.trim()===''){
        return '';
    }
    const slug = str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return slug  
}


const validateSlug = (slug: string): string => { // Function to validate and clean the generated slug
    const cleanedSlug = slug
        .slice(0, 100)
        .replace(/^-+|-+$/g, "");

    if (!cleanedSlug) {
        throw new Error("Cannot generate a valid slug from this title");
    }

    return cleanedSlug;
};

export { slugify, validateSlug };