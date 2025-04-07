import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomTextField from "src/app/@components/CustomTextField";
import FileUpload from "src/app/@components/FileUploader";
import { BASE_URL } from "src/app/constant/constants";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import CustomPhoneWithCountryCode from "src/app/@components/CustomPhoneWithCountryCode";
import { PictureAsPdf } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import InputColor from "react-input-color";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import clsx from "clsx";
import { Box, Icon, Typography } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function SiteSettingForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const classes = useStyles(props);
  const { errors } = formState;
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const getCountryCode1 = watch("country_code1");
  const [previewDoc2File, setPreviewDoc2File] = useState("");

  const [fileExtDoc1Name, setFileExtDoc1Name] = useState("");

  const [previewDoc1Image, setPreviewDoc1Image] = useState("");

  const [fileExtDoc2Name, setFileExtDoc2Name] = useState("");

  const fileInputdoc1Ref = useRef(null);
  const fileInputdoc2Ref = useRef(null);

  const doc1File = watch("logo") || "";
  const doc2File = watch("favicon") || "";

  useEffect(() => {
    setFileExtDoc1Name("");
    setPreviewDoc1Image("");
  });

  const handleRemoveDOC1File = () => {
    setFileExtDoc1Name(null);
    setPreviewDoc1Image(null);
    setValue("logo", "");

    if (fileInputdoc1Ref.current) {
      fileInputdoc1Ref.current.value = "";
    }

    console.log("sfsdferwer", getValues());
  };
  const handleRemoveDOC2File = () => {
    setFileExtDoc2Name(null);
    setPreviewDoc2File(null);
    setValue("favicon", "");

    if (fileInputdoc2Ref.current) {
      fileInputdoc2Ref.current.value = "";
    }
  };

  return (
    <div>
      <CustomTextField name="title" label="Title" required />
      <CustomTextField name="site_name" label="Site Name" required />
      <CustomTextField name="site_address" label="Site Address" required />
      <CustomTextField name="owner_name" label="Owner Name" />{" "}
      <CustomTextField name="phone" label="Phone Number" />
      <CustomTextField name="agency_name_bangla" label="Agency Name Bangla" />
      <CustomTextField name="agency_name_arabic" label="Agency Name Arabic" />
      <CustomTextField name="rl_no" label="RL No" />
      <CustomTextField name="rl_no_arabic" label="RL No Arabic" />
      <CustomTextField name="email" label="Email" />
      <CustomTextField name="address" label="Address" />
      <CustomTextField name="facebook_url" label="Facebook URL" />
      <CustomTextField name="twitter_url" label="Twitter URL" />
      <CustomTextField name="instagram_url" label="Instagram URL" />
      <div className="flex items-center justify-between gap-5">
        <CustomTextField name="color_code" label="Color Code" required />
        <div>
          <InputColor
            initialValue=""
            onChange={(color) => setValue("color_code", color.hex)}
            placement="right"
          />
        </div>
        <div
          className="rounded m-auto"
          style={{
            height: "50px",
            width: "50px",

            backgroundColor: watch("color") || "white",
          }}
        />
      </div>
      {/* <div className='text-center'>
        <div>
          <FileUpload
            name='logo'
            label='Logo'
            control={control}
            setValue={setValue}
            setFile={setLogo}
            file={logo}
            BASE_URL={BASE_URL}
            classes={classes}
          />
        </div>
      </div>
      <div className='text-center'>
        <div>
          <FileUpload
            name='favicon'
            label='Favicon'
            control={control}
            setValue={setValue}
            setFile={setFavicon}
            file={favicon}
            BASE_URL={BASE_URL}
            classes={classes}
          />
        </div>
      </div> */}
      <div className="flex justify-start -mx-16 flex-col md:flex-row">
        <Controller
          name="logo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex w-full flex-row items-center justify-center ml-16">
              <div className="flex-col">
                <Typography className="text-center">Logo</Typography>
                <label
                  htmlFor="logo-button-file"
                  className={clsx(
                    classes.productImageUpload,
                    "flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  )}
                >
                  <input
                    accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    id="logo-button-file"
                    type="file"
                    onChange={async (e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setPreviewDoc1Image(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);

                      const file = e.target.files[0];

                      if (file) {
                        const fileExtension = file.name
                          .split(".")
                          .pop()
                          .toLowerCase();
                        setFileExtDoc1Name(fileExtension);
                        onChange(file);
                      }

                      // Force reset the input value to allow re-uploading the same file
                      e.target.value = "";
                    }}
                  />
                  <Icon fontSize="large" color="action">
                    cloud_upload
                  </Icon>
                </label>
              </div>
              {!previewDoc1Image && doc1File && (
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    width: "fit-content",
                  }}
                >
                  <div
                    id="cancelIcon"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      zIndex: 1,
                      color: "red",
                      cursor: "pointer",
                      backgroundColor: "white",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HighlightOffIcon onClick={handleRemoveDOC1File} />
                  </div>
                  <div
                    style={{
                      width: "auto",
                      height: "150px",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    {typeof doc1File === "string" &&
                    ["pdf", "doc", "docx"].includes(
                      doc1File.split(".").pop().toLowerCase()
                    ) ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        {doc1File.toLowerCase().includes("pdf") ? (
                          <PictureAsPdf
                            style={{
                              color: "red",
                              cursor: "pointer",
                              display: "block",
                              fontSize: "137px",
                              margin: "auto",
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc1File}`)
                            }
                          />
                        ) : (
                          <DescriptionIcon
                            style={{
                              color: "blue",
                              cursor: "pointer",
                              display: "block",
                              fontSize: "137px",
                              margin: "auto",
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc1File}`)
                            }
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src={`${BASE_URL}${doc1File}`}
                        style={{ height: "100px" }}
                      />
                    )}
                  </div>
                </div>
              )}

              {previewDoc1Image ? (
                <div
                  style={{
                    width: "auto",
                    height: "150px",
                    overflow: "hidden",
                  }}
                >
                  {fileExtDoc1Name &&
                  ["pdf", "doc", "docx"].includes(fileExtDoc1Name) ? (
                    <div
                      style={{
                        display: "flex",
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      <div
                        id="cancelIcon"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          zIndex: 1,
                          color: "red",
                          cursor: "pointer",
                          backgroundColor: "white",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <HighlightOffIcon onClick={handleRemoveDOC1File} />
                      </div>
                      {fileExtDoc1Name === "pdf" ? (
                        <iframe
                          src={previewDoc1Image}
                          frameBorder="0"
                          scrolling="auto"
                          height="150px"
                          width="150px"
                        />
                      ) : (
                        <DescriptionIcon
                          style={{
                            color: "blue",
                            cursor: "pointer",
                            display: "block",
                            fontSize: "137px",
                            margin: "auto",
                          }}
                          onClick={() => window.open(previewDoc1Image)}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      <div
                        id="cancelIcon"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          zIndex: 1,
                          color: "red",
                          cursor: "pointer",
                          backgroundColor: "white",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <HighlightOffIcon onClick={handleRemoveDOC1File} />
                      </div>
                      <img
                        src={previewDoc1Image}
                        style={{ height: "140px", width: "150px" }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                !doc1File && (
                  <Box
                    height={180}
                    width={180}
                    my={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    style={{
                      width: "150px",
                      height: "70px",
                      border: "1px solid red",
                    }}
                    className={clsx(
                      classes.productImageUpload,
                      "flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                    )}
                  >
                    <Typography className="text-sm font-700">
                      <span className="mr-4 text-xs text-red-500">
                        Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
                      </span>
                    </Typography>
                  </Box>
                )
              )}
            </div>
          )}
        />

        <Controller
          name="favicon"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex w-full flex-row items-center justify-center ml-16">
              <div className="flex-col">
                <Typography className="text-center">Favicon</Typography>
                <label
                  htmlFor="favicon-button-file"
                  className={clsx(
                    classes.productImageUpload,
                    "flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  )}
                >
                  <input
                    accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    id="favicon-button-file"
                    type="file"
                    onChange={async (e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setPreviewDoc2File(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);

                      const file = e.target.files[0];

                      if (file) {
                        const fileExtension = file.name
                          .split(".")
                          .pop()
                          .toLowerCase();
                        setFileExtDoc2Name(fileExtension);
                        onChange(file);
                      }

                      // Force reset the input value to allow re-uploading the same file
                      e.target.value = "";
                    }}
                  />
                  <Icon fontSize="large" color="action">
                    cloud_upload
                  </Icon>
                </label>
              </div>
              {!previewDoc2File && doc2File && (
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    width: "fit-content",
                  }}
                >
                  <div
                    id="cancelIcon"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      zIndex: 1,
                      color: "red",
                      cursor: "pointer",
                      backgroundColor: "white",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HighlightOffIcon onClick={handleRemoveDOC2File} />
                  </div>
                  <div
                    style={{
                      width: "auto",
                      height: "150px",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    {typeof doc2File === "string" &&
                    ["pdf", "doc", "docx"].includes(
                      doc2File.split(".").pop().toLowerCase()
                    ) ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        {doc2File.toLowerCase().includes("pdf") ? (
                          <PictureAsPdf
                            style={{
                              color: "red",
                              cursor: "pointer",
                              display: "block",
                              fontSize: "137px",
                              margin: "auto",
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc2File}`)
                            }
                          />
                        ) : (
                          <DescriptionIcon
                            style={{
                              color: "blue",
                              cursor: "pointer",
                              display: "block",
                              fontSize: "137px",
                              margin: "auto",
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc2File}`)
                            }
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src={`${BASE_URL}${doc2File}`}
                        style={{ height: "100px" }}
                      />
                    )}
                  </div>
                </div>
              )}

              {previewDoc2File ? (
                <div
                  style={{
                    width: "auto",
                    height: "150px",
                    overflow: "hidden",
                  }}
                >
                  {fileExtDoc2Name &&
                  ["pdf", "doc", "docx"].includes(fileExtDoc2Name) ? (
                    <div
                      style={{
                        display: "flex",
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      <div
                        id="cancelIcon"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          zIndex: 1,
                          color: "red",
                          cursor: "pointer",
                          backgroundColor: "white",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <HighlightOffIcon onClick={handleRemoveDOC2File} />
                      </div>
                      {fileExtDoc2Name === "pdf" ? (
                        <iframe
                          src={previewDoc2File}
                          frameBorder="0"
                          scrolling="auto"
                          height="150px"
                          width="150px"
                        />
                      ) : (
                        <DescriptionIcon
                          style={{
                            color: "blue",
                            cursor: "pointer",
                            display: "block",
                            fontSize: "137px",
                            margin: "auto",
                          }}
                          onClick={() => window.open(previewDoc2File)}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      <div
                        id="cancelIcon"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          zIndex: 1,
                          color: "red",
                          cursor: "pointer",
                          backgroundColor: "white",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <HighlightOffIcon onClick={handleRemoveDOC2File} />
                      </div>
                      <img
                        src={previewDoc2File}
                        style={{ height: "140px", width: "150px" }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                !doc2File && (
                  <Box
                    height={180}
                    width={180}
                    my={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    style={{
                      width: "150px",
                      height: "70px",
                      border: "1px solid red",
                    }}
                    className={clsx(
                      classes.productImageUpload,
                      "flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                    )}
                  >
                    <Typography className="text-sm font-700">
                      <span className="mr-4 text-xs text-red-500">
                        Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
                      </span>
                    </Typography>
                  </Box>
                )
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default SiteSettingForm;
