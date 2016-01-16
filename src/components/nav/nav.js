import React from 'react';
import style from './nav.less';

export default class Nav extends React.Component {

    render() {
        const {show, post, posts} = this.props;
        const clazz = show ? style['nav-show'] : style['nav'];

        return (
            <div className={clazz}>
                <div className={style['hd']}>
                    <h2 className={style['name']}>RMD</h2>
                </div>
                <div className={style['bd']}>
                    <ul className={style['list']}>
                        {
                            posts.map((item, idx) => {
                                const clazz = item.id === post.id ? style['item-active'] : style['item'];
                                return (
                                    <li key={idx} className={clazz}>
                                        <div className={style['cover']}>
                                            <img src="http://mmrb.github.io/avatar/jf.jpg" alt="" className={style['img']}/>
                                        </div>
                                        <div className={style['info']}>
                                            <h3 className={style['title']}>{item.title}</h3>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}