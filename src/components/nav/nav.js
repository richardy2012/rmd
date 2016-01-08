
import React from 'react';
import style from './nav.less';

export default class Nav extends React.Component {

    render() {
        const clazz = this.props.show ? style['nav-show'] : style['nav'];
        return (
            <div className={clazz}>
                <div className="hd">
                    <h2 className={style.title}>RMD</h2>
                </div>
            </div>
        );
    }
}