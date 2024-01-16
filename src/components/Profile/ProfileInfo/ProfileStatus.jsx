import React from 'react'

class ProfileStatus extends React.Component {
    //Делаем локальный state
    state = {
        editMode: false,
        status: this.props.status
    }

    //Метод ЖЦ вызывается когда страничка перерисовывается (изменяются props или перерисовывается state)
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status)
            this.setState({ status: this.props.status });
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={() => { this.setState({ editMode: true }) }}>{!this.props.status ? "Not Status!" : this.props.status}</span>    {/* this.setState говорит React что надо перерисовать локальный state */}
                    </div>
                    :
                    <div>
                        <input autoFocus={true} value={this.state.status}
                            onBlur={() => { this.setState({ editMode: false }); this.props.setStatusUserThunk(this.state.status) }}
                            onChange={(e) => { this.setState({ status: e.currentTarget.value }) }} />
                        {/* this.setState говорит React что надо перерисовать локальный state; onBlur - убираем фокус; autoFocus - автовокус */}
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;