import {createClient} from "@sanity/client"
import imageURLBuilder from "@sanity/image-url"

const client=createClient({
    projectId: 'reyrcej2',
    dataset: 'production',
    useCdn:true,
    apiVersion:'2023-05-28'
})

const builder=imageURLBuilder(client)

export const urlFor=(source)=>builder.image(source)

export const getCategory=async ()=>{
   const items= await client.fetch('*[_type=="category"]').then((data)=>{return data})
   return items;
}

// supply id dyanmically 
export const getCategoryItemsById=async (id)=>{
    const items= await client.fetch(`*[_type=="items" && $id in category[]->_id]`,{id})
    .then((data)=>{return data})
    return items;
}
  
export const getItemById=async (id)=>{
    const item= await client
    .fetch(`*[_type=="items" && _id == $id][0]`,{id})
    .then((data)=>{return data})
    return item;
}