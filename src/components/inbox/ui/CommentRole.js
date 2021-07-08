import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCommentsReply, saveComments, saveReplies, startSaveCommentsLoading } from 'actions/information'
import { startDownloadDocument } from 'actions/search'
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    coment: {
        backgroundColor: '#E1F0FF',
        color: '#494B74',
        padding: 12,
        borderRadius: 10,
        height: 'auto',
        marginTop: 10
    },
    buttoncomment: {
        fontSize: 12,
        cursor: 'pointer',
        "&:hover": {
            color: "#3699FF"
        }
    },
    totalcomments: {
        marginLeft: 5,
        fontSize: 12,
        color: "#A7A8BB",
        marginTop: 1,
        cursor: 'pointer',
        "&:hover": {
            textDecoration: 'underline'
        }
    },
    newcomment: {
        //backgroundColor: '#E1F0FF',
        color: '#494B74',
        padding: 12,
        borderRadius: 5,
        height: 'auto',
        marginTop: 10
    }
}));



const CommentRole = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { commentList=[] } = useSelector(state => state.flowDocument);


    return (
        <div>
            <Divider className="mt-1" style={{ height: 1, background: "rgba(0, 0, 0, 0.12)" }} />
            <div style={{ marginTop: '16px', maxHeight: '650px', overflow: 'auto' }}>
                {commentList.length > 0 && commentList.map(({ userId, comment, completedAt,  attachments }) => {
                    return (
                        <>
                    <div className={classes.coment}>
                    <span style={{ fontSize: 15, color: "#3699FF", fontWeight:500}}>{userId}</span><span style={{ marginLeft: 5, fontSize: 12, color: "#A7A8BB", }} >{new Date(completedAt).toLocaleString()}</span>
                    <br />
                    <span style={{ fontSize: 14, marginTop: 40}}>{comment}</span>
                    <br />
                    {attachments && attachments.length > 0 && attachments.map(({ name, id }) => {
                        return (<span style={{  marginTop: 40, color: "#3699FF", fontSize: 11, cursor: 'pointer' }}>{`Documento adjunto: `}{name}</span>)
                    })

                    }
                   
                </div>
                        </>
                    )

                }).reverse()
                }
            </div>
        </div>
    )

}
export default CommentRole
