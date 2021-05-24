import React, { useEffect, useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { TimelineConnector, TimelineItem, TimelineSeparator } from '@material-ui/lab';



const useStyles = makeStyles((theme) => ({
	timeline: {
        transform: "rotate(90deg)"
      },
      timelineContentContainer: {
        textAlign: "left"
      },
      timelineContent: {
        display: "inline-block",
        transform: "rotate(-90deg)",
        textAlign: "center",
        minWidth: 50
      },
      timelineIcon: {
        transform: "rotate(-90deg)"
      }
}));


const Timeline = () => {

	const classes = useStyles();

	const isMounted = useRef(true)
	


	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])



	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <Timeline className={classes.timeline} align="alternate">
                <TimelineItem>
                    <TimelineSeparator>
                    <CheckCircleOutlineIcon
                        color="primary"
                        className={classes.timelineIcon}
                    />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent className={classes.timelineContentContainer}>
                    <Paper className={classes.timelineContent}>
                        <Typography>Eat</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <PauseCircleFilledIcon
                        color="primary"
                        className={classes.timelineIcon}
                    />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent className={classes.timelineContentContainer}>
                    <Paper className={classes.timelineContent}>
                        <Typography>Code</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <CachedIcon color="primary" className={classes.timelineIcon} />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent className={classes.timelineContentContainer}>
                    <Paper className={classes.timelineContent}>
                        <Typography>Sleep</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <CachedIcon color="primary" className={classes.timelineIcon} />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent className={classes.timelineContentContainer}>
                    <Paper className={classes.timelineContent}>
                        <Typography>Repeat</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <ErrorIcon color="primary" className={classes.timelineIcon} />
                    </TimelineSeparator>
                    <TimelineContent className={classes.timelineContentContainer}>
                    <Paper className={classes.timelineContent}>
                        <Typography>Sleep</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>
                </Timeline>
			</div>
		</div>
	)
}

export {Timeline}