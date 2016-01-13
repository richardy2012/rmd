import React from 'react';
import style from './nav.less';

export default class Nav extends React.Component {

    _renderItem(post) {
        return (
            <div className={style.item}>
                <div className={style.cover}>
                    <img className={style.img} src="http://mmrb.github.io/avatar/jf.jpg" alt=""/>
                </div>
                <div className={style.content}>
                    <h3 className={style.title}>{post.title}</h3>
                    <p className={style.summary}>desc</p>
                </div>
            </div>
        );
    }

    render() {
        const clazz = this.props.show ? style['nav-show'] : style['nav'];
        const posts = this.props.posts;

        return (
            <div className={clazz}>
                <div className={style.hd}>
                    <h2 className={style.name}>RMD</h2>
                </div>
                <div className={style.bd}>
                    {
                        posts.map((post) => {
                            return this._renderItem(post);
                        })
                    }
                </div>
            </div>
        );
    }
}