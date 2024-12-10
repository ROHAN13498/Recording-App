import { supabase } from "./supabase";

export const GetSignedUrl = async (folder:string,name:string) => {
    try {
      const { data } = await supabase.storage
        .from("App")
        .createSignedUrl(`${folder}/${name}`, 600);
      return data?.signedUrl;  
    } catch (error) {
      console.log(error);
      return null;
    }
};