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



const Comments = (props) => {
    const { authUser, fileId } = props

    const classes = useStyles();
    const dispatch = useDispatch()
    const { comments = [], } = useSelector(state => state.info);

    const { authorities } = useSelector(state => state.auth);
    const ROLE_FILE_COMMENT_CREATE = authorities.find(rol => rol === 'ROLE_FILE_COMMENT_CREATE')

    useEffect(() => {
        dispatch(startSaveCommentsLoading(authUser, fileId))
    }, [fileId])

    const Comment = (props) => {
        const { author, text, date, countcomments, attachment, idComment } = props

        const [active, setActive] = useState(false);
        const [replies, setReplies] = useState([])


        const loadingReplies = async () => {
            const reply = await getCommentsReply(authUser, idComment)
            setReplies(reply)
        }

        const handleDownload = (fileId, name) => {
            dispatch(startDownloadDocument(fileId, name))

        }


        
        return (
            <>

                <div className={classes.coment}>
                    <span style={{ fontSize: 15, color: "#3699FF", fontWeight:500}}>{author}</span><span style={{ marginLeft: 5, fontSize: 12, color: "#A7A8BB", }} >{new Date(date).toLocaleString()}</span>
                    <br />
                    <span style={{ fontSize: 14, marginTop: 40}}>{text}</span>
                    <br />
                    {attachment && attachment.length > 0 && attachment.map(({ name, id }) => {
                        return (<span style={{  marginTop: 40, color: "#3699FF", fontSize: 11, cursor: 'pointer' }} onClick={() => handleDownload(id, name)}>{`Documento adjunto: `}{name}</span>)
                    })

                    }
                   
                </div>
                    <Grid container style={{marginTop: 5}} >
                    {(ROLE_FILE_COMMENT_CREATE) &&
                        <span style={{marginLeft: 10}} className={classes.buttoncomment} onClick={() => setActive(!active)} >
                            <MessageOutlinedIcon style={{ fontSize: 20, marginRight: 5 }} />
                            <IntlMessages id="comment.button.comment" />
                        </span>
                    }
                        <span className={classes.totalcomments} onClick={loadingReplies} >
                            {countcomments === 0 ? '' : <>{countcomments + ' '}
                            <IntlMessages id="comment.button.totalcomments" /></>}
                        </span>
                    </Grid>
                <div style={{ marginLeft: 50 }}>
                    {replies && replies.length > 0 && replies.map(({ author, content, createdOn, id, totalReplies, attachments }) => {
                        return (
                            <>
                                <Comment
                                    author={author}
                                    text={content}
                                    date={createdOn}
                                    countcomments={totalReplies}
                                    attachment={attachments}
                                    idComment={id}
                                    
                                />
                            </>
                        )

                    }).reverse()
                    }
                </div>
                {active &&
                    <NewComment idComment={idComment} />
                }





            </>)

    }



    const NewComment = (props) => {
        const { idComment } = props

        const [text, setText] = useState('')
        const [file, setFile] = useState()
        const [name, setName] = useState()


        const handleSubmit = async e => {
            e.preventDefault()
            if (idComment) {
                dispatch(saveReplies(authUser, fileId, idComment, text, file))
            }
            else {
                dispatch(saveComments(authUser, fileId, text, file))
            }
            setName()
            setFile()
            setText('')

        }

        const handleChange = (event) => {
            event.preventDefault();
            setName(event.target.files[0].name)
            setFile(event.target.files[0])
        }

        const handleClear = () => {
            setFile()
            setName()
        }



        return (
            <div className={classes.newcomment}>
                {(ROLE_FILE_COMMENT_CREATE) &&
                    <form action="javascript:void(0);">
                        <Grid container>
                            <Grid item xs={11}>
                                <TextField
                                    color="primary"
                                    id="outlined-full-width"
                                    label={<IntlMessages id="comment.newcomment.title" />}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={(event) => setText(event.target.value)}
                                    
                                />
                            </Grid>
                            <Grid item xs={1} >
                                <IconButton 
                                    style={{ background: isEmpty(text) ? "#E0E0E0" : "#3699FF", width: 35, height: 35, marginLeft: 15, marginTop: 25}}
                                    disabled={isEmpty(text)}
                                    onClick={handleSubmit}>
                                    <NearMeOutlinedIcon style={{ color: "white", fontSize: 22 }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <label htmlFor={idComment}>    
                            
                                    <AttachFileOutlinedIcon fontSize="small" color="primary" />
                        
                                <span style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13, cursor: 'pointer' }}>{file ? '' : <IntlMessages id="comment.attachment.title" />}</span>
                                <input
                                    className={classes.input}
                                    id={idComment}
                                    type="file"
                                    onChange={handleChange}

                                />
                            </label>

                            <span style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13 }}>{file ? <>{name}<ClearIcon fontSize="small" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={handleClear} /></> : ''}</span>


                        </Grid>
                    </form>
                }
            </div>
        )
    }

    return (
        <div>
            {
                <div>
                    <NewComment />
                    <Divider className="mt-1" style={{ height: 1, background: "rgba(0, 0, 0, 0.12)" }} />
                </div>
            }
            <div style={{ marginTop: '16px', maxHeight: '650px', overflow: 'auto' }}>
                {comments.length > 0 && comments.map(({ author, content, createdOn, id, totalReplies, attachments }) => {
                    return (
                        <>
                            <Comment
                                author={author}
                                text={content}
                                date={createdOn}
                                countcomments={totalReplies}
                                attachment={attachments}
                                idComment={id}
                            />
                        </>
                    )

                }).reverse()
                }
            </div>
        </div>
    )

}

export default Comments
