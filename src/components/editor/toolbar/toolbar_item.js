
import React from 'react';
import Icon from 'react-fa';
import style from './toolbar.less';

export default class ToolbarItem extends React.Component {

    static propTypes = {
        icon: React.PropTypes.string,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        icon: 'bold',
        onClick: () => {}
    };

    render() {
        const {icon, onClick} = this.props;
        return (
            <a href="javascript:;" className={style.item} onClick={onClick}>
                <Icon name={icon} />
            </a>
        );
    }
}