import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const Lesson = () => {
    const editorRef = useRef<any>(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <div>
            <Editor
                tinymceScriptSrc={"./tinymce/tinymce.min.js"}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "help",
                        "wordcount",
                        "table",
                        "image",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | insertfile link image | help | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: (cb, _value, _meta) => {
                        var input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");

                        input.onchange = function () {
                            const target = this as HTMLInputElement;
                            var file = target.files?.[0];

                            var reader = new FileReader();
                            reader.onload = function () {
                                var id = "blobid" + new Date().getTime();

                                var blobCache =
                                    editorRef.current?.editorUpload.blobCache;
                                const result = reader?.result as string;
                                var base64 = result?.split(",")[1];

                                var blobInfo = blobCache.create(
                                    id,
                                    file,
                                    base64
                                );
                                blobCache.add(blobInfo);

                                // /* call the callback and populate some fields */
                                cb(blobInfo.blobUri(), {
                                    title: file?.name,
                                });
                            };
                            reader.readAsDataURL(file as Blob);
                        };

                        input.click();
                    },
                }}
            />

            <button onClick={log}>Log editor content</button>
        </div>
    );
};

export default Lesson;
