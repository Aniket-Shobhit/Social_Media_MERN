import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
  
const MyPostWidget = ({ pictureUrl }) => {
    
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        try {
            setIsLoading(true);
            const values = {
                userId: _id,
                description: post,
            }
            if (image) {
                const imageBase64 = await convertToBase64(image);
                values.picture = imageBase64;
            }
    
            const response = await axios.post(
              `${process.env.REACT_APP_URL}/posts`,
              JSON.stringify(values),
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
    
            const posts = response.data;
            dispatch(setPosts({ posts }));
            setImage(null);
            setPost("");
            setIsLoading(false);
        } catch(err) {
            console.log(err);
        }
    }



    const setImageHandler = (image) => {
        setImage(image);
    }


    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={pictureUrl} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "0.5rem 2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (
            <Box
                border={`1px solid ${medium}`}
                borderRadius="5px"
                mt="1rem"
                p="0.4rem"
            >
                <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setImageHandler(acceptedFiles[0])}
                >
                    {({ getRootProps, getInputProps }) => (
                        <FlexBetween>
                            <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                p="0.5rem"
                                width="100%"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p style={{margin:'auto'}}>Add Image Here</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined />
                                    </FlexBetween>
                                )}
                            </Box>
                            {image && (
                                <IconButton
                                    onClick={() => setImage(null)}
                                    sx={{ width: "15%" }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            )}
                        </FlexBetween>
                    )}
                </Dropzone>
            </Box>
            )}
    
            <Divider sx={{ margin: "1rem 0" }} />
    
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: palette.primary.main }} />
                    <Typography
                        sx={{ "&:hover": { cursor: "pointer", color: palette.primary.main } }}
                        >
                        Image
                    </Typography>
                </FlexBetween>
    
                {/* {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
            
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
            
                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )} */}
        
                {!isLoading ? <Button
                    disabled={!(post || image)}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                        width: "10rem",
                    }}
                >
                    POST
                </Button> :
                <LoadingButton
                    loading
                    sx={{
                        borderRadius: "3rem",
                        width: "10rem",
                    }}
                    loadingPosition="start"
                    variant="outlined"
                >
                    POST
                </LoadingButton>}
            </FlexBetween>
        </WidgetWrapper>
    );
}


export default MyPostWidget;