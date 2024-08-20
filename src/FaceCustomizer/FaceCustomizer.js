import React from 'react';
import {useState, useEffect, useRef} from 'react';
import base from './ruin_girl_3halfanv/ui/story/base_0.png'
import angry from './ruin_girl_3halfanv/ui/story/menacing.png'
import { toPng } from 'html-to-image';

import {Button} from '@mui/joy';

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import Checkbox from '@mui/material/Checkbox';

import './FaceCustomizer.css'

const emotions = ["anger.png", "anger_b.png", "consent.png"]

const faces = require('./face-ui.json')
const devnames = require('./faces.json')

// console.info(faces.map((face) => face))

function ImagesFromFace(props) {

    

    
    function settingImage(id) {
        //props.savedasset.push(id);
        
        if(props.savedasset.includes(id)) {
            console.log("removing", id, " from saved assets")
            props.setsaved(props.savedasset.filter((asset) => asset !== id))
        }
        else {
            console.log("adding", id, " to saved assets")
            props.savedasset.push(id);
        }

        console.log("saved assets: ", props.savedasset)
    }

    useEffect(() => {
        console.log("you clicked on a new object: ", props.currentFace)
        props.setsaved([])

    }, [props.selectedFace])
       

    const listStyle = {
        height: '200px',
        width: 'fit-content',
        overflow: 'auto',
    }

        useEffect(() => {
            let base = faces[props.currentFace].story.files;
            base = base.filter((file) => file.includes("base"))
            console.log("base: ", base[0])
            props.setimage(base[0]);
        }, [props.currentFace]);

    try {
        console.log("selected face is: ", props.currentFace)
        const faceImages = faces[props.currentFace]
        console.info(faceImages.story.files)

        let base = faceImages.story.files;
        base = base.filter((file) => file.includes("base"))
        console.log("base: ", base[0])
        
        const faceList = faceImages.story.files.map((file)=> 
        <li key={file} onClick={()=>{props.setimage(file)}} style={{display: "flex", width: '150px'}}>
            {file}
            <Checkbox onClick={()=>{settingImage(file)}}/>
        </li>)
        return (
            <div>
            <ul style={listStyle}>{faceList}</ul>
            </div>
        )
    } catch (error) {
        console.error(error);
        return null;
    }
}

function ListOfFaces(props) {
    const search = useRef(null)
    const [results, setResults] = useState(devnames.faces)
    const listStyle = {
        height: '200px',
        width: 'fit-content',
        overflow: 'auto',
        cursor: 'pointer'

    }

    useEffect(() => {
        search.current.addEventListener('input', (e) => {
            console.log(e.target.value)
            const filter = e.target.value.toLowerCase()
            const filtered = devnames.faces.filter((face) => face.toLowerCase().includes(filter))
            setResults(filtered)

        })
    }, [])


    try {
        const listItems = results.map((face) => <li key={face} onClick={()=>{props.setface(face)}}>{face}</li>)
        if (listItems.length === 0) {
            throw new Error("No files");
        }
        return (
            <div>
            <input type="text" placeholder="search" ref={search}/>
            <ul style={listStyle}>{listItems}</ul>
            </div>
        )
    } catch (error) {
        console.error(error);
        return ["no files"];
    }
}


function Expression(props) {



    return(
    <div>

    </div>)
}

function FaceCustomizer() {
    const [selectedEmotion, setSelectedEmotion] = useState(false);
    const [selectedFace, setSelectedFace] = useState(devnames.faces[0]);
    const [selectedImage, setSelectedImage] = useState(null);

    const [savedAssets, setSavedAssets] = useState([])

    const elementRef = useRef(null);


    function buildUrl(face = selectedFace, img = selectedImage) {
        //https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/dark_psygirl/ui/story/base_0.png
        let source = "https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/";
        let character = face;
        let image = img;

        console.log(`${source}${character}/ui/story/${selectedImage}`)

        return `${source}${character}/ui/story/${selectedImage}`
    }

    function savedToUrl() {
        const saved = []

        savedAssets.map((asset) => {
            console.log("asset: ", asset)
            saved.push(`https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${selectedFace}/ui/story/${asset}`)
        })

        return saved
    }
    
    const imgRef = useRef(null)

    const leftO = '15.58%'
    const topO = '26.4%'

    const selected = {
        border: '1px solid black',
        opacity: '0.5',
        left: `${leftO - 5}`,
        top: `${parseFloat(topO) - 5}%`,
    }
    const baseStyle = {
        backgroundImage: `url(${base})`,
        backgroundRepeat: 'no-repeat',
        height: '100%',
    }


    const angryStyle = { 
        backgroundImage: `url(${angry})`,
        backgroundRepeat: 'no-repeat',
        height: '50vh',
        position: 'relative',
        left: {leftO},
        top: {topO},
    }

    const flex = {
        display: 'flex',
        flexDirection: 'row',
    }

    function clickedEmotion(e) {
        console.log("clicked emotion")
        setSelectedEmotion(!selectedEmotion)
    }

    const frame = document.getElementById('frame');

    console.log(savedToUrl())

    useEffect(() => {
        //face changed
        //reset selected image
        setSelectedImage(null)

    }, [selectedFace])

    const handleBringToFront = (index) => {
        // Assuming your Draggable component provides a method to reorder elements
        // Adjust the syntax based on your Draggable library's API
        console.log("double clicked", index)
        console.log(imgRef.current)
        imgRef.current.style.zIndex = index + 1;
      };

      const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "my-image-name.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        
        <div>
            <h1>Face Customizer</h1>
            {/* <div style={baseStyle}>
                <div style={selectedEmotion ? {...angryStyle, ...selected} : angryStyle} onClick={()=>{clickedEmotion()}} />
            </div> */}
            Selected face: {selectedFace}
            <div style={flex}>
            <ListOfFaces setface={setSelectedFace} setimage={setSelectedImage}/>
            <ImagesFromFace selectedimage={selectedImage} currentFace={selectedFace} setimage={setSelectedImage} savedasset={savedAssets} setsaved={setSavedAssets}/>



            <div id="canvas" ref={elementRef}>
            {/* {savedToUrl().map((url) => <img src={url} />)} */}
            {savedToUrl().map((url, index) =>
             <Draggable>
             <img draggable="false" id={("displayed_", index)} src={url} ref={imgRef} onDoubleClick={()=>{handleBringToFront(index)}}/>
             </Draggable>
             
             )}
                <div id="face"></div>
                
            </div>
            </div>
            {savedAssets.map((asset) => <div>{asset}</div>)}

            <input type="text" />
            <Button onClick={()=>{htmlToImageConvert()}}>Download</Button>
        </div>
    );
}

export default FaceCustomizer;