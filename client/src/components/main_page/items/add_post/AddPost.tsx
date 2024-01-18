import { useState } from 'react'
import './AddPost.css'
import Cookies from 'js-cookie'

export default function AddPost ({ handleClose } : {handleClose: Function}) {
    const [image, setImage] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const addPost = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: Cookies.get('userid'),
                content: content,
                image: image
            })
        };
        fetch('http://localhost:3001/addPost', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const convertToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImage(reader.result as string)
        }
    }

    return (
        <div className="add-post-container"> 
            <div className='text-field'>
                <textarea name="content" className='content-input' maxLength={600} value={content} onChange={e => setContent(e.target.value)}></textarea>
            </div>
            <div className='image-preview-container'>
                {image === "" || image === null ? "" : <img src={image} className='image-preview'/>}
            </div>
            <div className='post-buttons'>
                <button className='add-attachment-button'>
                    <label className='custom-file-upload'>
                        <input type='file' accept='image/*' onChange={e => convertToBase64(e)}/>
                        ADD PHOTO
                    </label>
                </button>
                <button className='add-post-button' onClick={() => {
                    addPost()
                    handleClose()
                }}
                >ADD POST
                </button>
            </div>
        </div>
    )
}