import React from 'react';
import cover from './default.jpg';
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
                                        <div className={style['info']}>
                                            <h3 className={style['title']}>{item.title || `untitled`}</h3>
                                        </div>
                                        <div className={style['cover']}>
                                            <img src={cover} alt="" className={style['img']}/>
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