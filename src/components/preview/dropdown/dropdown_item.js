
import React from 'react';
import Icon from 'react-fa';
import style from './dropdown.less';

export default class DropdownItem extends React.Component {
    static propTypes = {
        icon: React.PropTypes.string,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        icon: 'download',
        onClick: () => {}
    };

    render() {
        const {icon, onClick, children} = this.props;

        return (
            <a href="javascript:;" className={style.item} onClick={onClick}>
                <Icon name={icon} /> {children}
            </a>
        );
    }
}