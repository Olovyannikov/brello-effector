import {MantineProvider} from "@mantine/core";
import type {PropsWithChildren} from "react";

export const ThemeProvider = ({children}: PropsWithChildren) => {
    return <MantineProvider>{children}</MantineProvider>
}