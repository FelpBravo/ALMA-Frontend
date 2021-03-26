import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FolderDialog from './ui/FolderDialog';
import { useParams , useRouteMatch} from 'react-router-dom';

const Folders = () => {

    const dispatch = useDispatch();

    useEffect(() => {


    }, []);

  
    const { id } = useParams()


    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="jr-card">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                            <h2>{id}</h2>
                            <h1>Prueba</h1>
                        </div>
                    </div>
                </div>
            </div>

            <FolderDialog />

        </div>

    );
}

export default Folders;
