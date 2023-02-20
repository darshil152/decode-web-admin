import React from "react";
import { createContext } from "react";

export const HeaderContext = createContext();


export default class HeaderContext extends Component {
    state = {
        data: [],
    }

    setData = (data) => {
        this.setState({ data: data })
    }

    render() {
        return (
            <HeaderContext.Provider handleSetData={this.setData} value={{ ...this.state.data }}>

            </HeaderContext.Provider>
        )
    }
}
