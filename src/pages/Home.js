import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './Home.css';

function Home() {
    const [kalas, setKalas] = useState([]);
    const dispatch = useDispatch();
    const userid = Number.parseInt(localStorage.getItem("id"));

    const getImageRequest = async () => {
        axios

            .get("https://kalavithi-service-team-01-dev.herokuapp.com/api/images")
            //.get("http://localhost:8081/api/images")
            //    .get(process.env.REACT_APP_API_ENDPOINT + "/images")

            .then((response) => {
                setKalas(response.data.images);
            });

    };

    useEffect(() => {
        getImageRequest();
    }, []);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [idOfClickedImage, setIdOfClickedImage] = useState(0);

    const handleOnClick = (inputId) => {
        setIdOfClickedImage(inputId)
        dispatch(actions.showModal())
        dispatch(actions.showCarousel())
    }

    return (
        <div className="container-fluid kala-app">
            <NavBar />
            <div className="d-flex flex-wrap">
                <Box
                    data-testid="box-id"
                    sx={{ width: "100%", height: "100%" }}
                    style={{ marginLeft: "5%", marginRight: "5%" }}
                >
                    <ImageList
                        variant="masonry"
                        cols={3}
                        gap="4%"
                        data-testid="image-list-id"
                    >
                        {kalas.map((ka) => (
                            <ImageListItem key={ka.url} className="image-list" style={{marginBottom: "4%"}}>
                                <div className="image-container">
                                    <img
                                        src={`${ka.url}?w=248&fit=crop&auto=format`}
                                        srcSet={`${ka.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={ka.name}
                                        loading="lazy"
                                        onClick= {() =>handleOnClick(ka.id)}

                                    />

                                    <div className="overlay d-flex align-items-end justify-content-end">
                                        {/* <AddFavourite /> */}

                                        <LikeAnImage
                                            userid={userid}
                                            kaid={ka.id}

                                        ></LikeAnImage>
                                    </div>
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>

                <PopUpModal></PopUpModal>
                <ImageCarousel kalas = {kalas} id = {idOfClickedImage}/>
            </div>
        </div>
    );
}
export default Home;
