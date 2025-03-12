import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function CustomRichTextEditor({ name, control, editorRef, required = false, errors }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => {
        const isFieldEmpty = required && !field.value?.trim(); // ✅ Fixed condition

        return (
          <div>
            <Editor
              value={field.value || ""}
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              apiKey="97q3jo27j3igdlo6hc3hkv5ut16l37jdmv6b804duzect0ao"
              placeholder="Full description"
              onEditorChange={(content) => {
                field.onChange(content);
              }}
              id={name}
              init={{
                height: 350,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            {isFieldEmpty && <p style={{ color: "red", marginTop: "5px" }}>This field is required</p>}
            {errors?.[name] && <p style={{ color: "red", marginTop: "5px" }}>{errors?.[name]?.message}</p>}
          </div>
        );
      }}
    />
  );
}

export default CustomRichTextEditor;
