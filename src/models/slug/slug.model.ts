import prisma from '#/config/prisma.js'


const getSlug = async (slug: string) => {
    const existingSlug = await prisma.categories.findUnique({  // find unique category by slug
        where: {
            slug: slug
        }
    })
    if(!existingSlug){
        return null
    }
    const {id} = existingSlug
    return id
}

const  newSlug = async (slug: string) => {
    const enteredSlug = await prisma.categories.create({  // create a new category with the given slug
         data: {
            name: slug,
            slug: slug
         }
    })
  const {id} = enteredSlug
  return id
}

export { getSlug, newSlug }