import {useState} from "react";
import Form from "react-bootstrap/Form";

export default function FileInput({post , register  , setValue}){
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");

    return(
        <Form.Group className="mb-4 position-relative">
            <Form.Label className={`fs-6 py-2 px-2 rounded-4 position-absolute top-0 start-0 translate-middle-y ms-3 bg-white`} style={{ zIndex: 2, pointerEvents: "none", whiteSpace: "nowrap" }}>
                انتخاب عکس پروفایل
            </Form.Label>
            <Form.Control id="profilePhoto" type="file" accept="image/*" className="d-none"{...register(post)}
                          onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                  setSelectedFileName(file.name);
                                  const reader = new FileReader();
                                  reader.onloadend = () => setImagePreview(reader.result);
                                  reader.readAsDataURL(file);

                                  // ست کردن فقط همون فایل در فرم
                                  setValue(post, file);
                              } else {
                                  setSelectedFileName("");
                                  setImagePreview(null);
                                  setValue(post, null);
                              }
                          }}/>
            <label htmlFor="profilePhoto" className="btn btn-outline-secondary rounded-5 py-3 w-100 fs-5" style={{ cursor: "pointer" }}>{selectedFileName || "انتخاب عکس پروفایل"}</label>
            {imagePreview && (
                <div className="mt-3 text-center">
                    <img src={imagePreview} alt="Preview" style={{maxWidth: "200px", maxHeight: "200px", borderRadius: "10px", objectFit: "cover",}}/>
                </div>
            )}
        </Form.Group>
    )
}