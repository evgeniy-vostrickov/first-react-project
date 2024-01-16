import React, {useState, useEffect} from 'react'

const ProfileStatusHook = (props) => {
    const [editMode, setEditMode] = useState(false); //хук для проверки в какой мы состоянии
    const [status, setStatus] = useState(props.status); //хук для хранения временного статуса

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    
    return (
        <div>
                {!editMode ?
                    <div>
                        <span onDoubleClick={() => { setEditMode(true) }}>{!props.status ? "Not Status!" : props.status}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true} value={status}
                            onBlur={() => { setEditMode(false); props.setStatusUserThunk(status) }}
                            onChange={(e) => { setStatus(e.currentTarget.value) }} />
                        {/* onBlur - убираем фокус; autoFocus - автовокус */}
                    </div>
                }
            </div>
    )
}

export default ProfileStatusHook;