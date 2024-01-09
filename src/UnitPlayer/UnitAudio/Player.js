import useSound from 'use-sound';
import Button from '@mui/joy/Button';


const Player = (props) => {
    const [play] = useSound(props.audio);

    console.log(props.audio);
    return <Button onClick={play}>{props.unit}</Button>;

}
export default Player;