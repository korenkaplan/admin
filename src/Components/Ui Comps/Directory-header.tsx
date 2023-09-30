import  { FC } from 'react';
import HomeIcon from '@mui/icons-material/Home';
interface Props {
    header: string;
}

const DirectoryHeader: FC<Props> = ({ header }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,width:'100%', height:40,margin:15,position:'relative',right:45}}>
            <HomeIcon />
            <h3>/ {header}</h3>
        </div>
    );
};

export default DirectoryHeader;