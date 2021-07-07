import React, { useContext } from "react"
import { IconType } from "./IconType"
import { ThemeContext } from "styled-components"
import { CheckCircle, AlertCircle, DollarSign } from "react-feather"
import { ReactComponent as RugIcon } from '../../assets/svg/rug24.svg'

const Icon = ({type} : {type: IconType}) => {
    const theme = useContext(ThemeContext)

    switch(type) {
        case IconType.Success: 
            return <CheckCircle color={theme.green1} size={24} />
        case IconType.Failure: 
            return <AlertCircle color={theme.red1} size={24} />
        case IconType.Profit: 
            return <DollarSign  color={theme.yellow1} size={24} />
        case IconType.Rug: 
            return <RugIcon />
    }
}

export default Icon