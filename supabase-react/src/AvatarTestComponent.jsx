import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";

export default function Avatar({url, size, onUpload}) {

    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    async function uploadAvatar(event) {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let {error: uploadError} = await supabase.storage.from('avatars').upload(filePath, file)
            
            if (uploadError) {
                throw uploadError
            }

            onUpload(event, filePath)
        } catch (error) {
            alert(error);
        } finally {
            setUploading(false)
        }
            
    }

    async function getAvatar(path) {

    }

}