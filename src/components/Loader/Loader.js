import React from 'react';
import classes from './Loader.css';

const loader = () => (
    // <div className={classes.LoaderPosition}>
    //     <div className={classes.Loader}>
    //         <div className={[classes.Cube1, classes.Cube].join(" ")}></div>
    //         <div className={[classes.Cube2, classes.Cube].join(" ")}></div>
    //         <div className={[classes.Cube4, classes.Cube].join(" ")}></div>
    //         <div className={[classes.Cube3, classes.Cube].join(" ")}></div>
    //     </div>
    // </div>

    <div className={classes.LoaderPosition}>
        <div className={classes.Loader}>
            <div className={[classes.Loader1, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader2, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader3, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader4, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader5, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader6, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader7, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader8, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader9, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader10, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader11, classes.LoaderChild].join(' ')}></div>
            <div className={[classes.Loader12, classes.LoaderChild].join(' ')}></div>
        </div>
    </div>

)

export default loader;


