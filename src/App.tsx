import React, { useState } from 'react';
import { Flex, Link, Icon } from '@chakra-ui/core';
import { SpoilerLog } from './types/spoilerLog';
import { Upload } from './features/Upload';

const App = () => {
    const [spoilerLog, setSpoilerLog] = useState<SpoilerLog>();

    if (!spoilerLog) {
        return (
            <Flex
                align="center"
                justify="center"
                padding="5em"
                direction="column"
            >
                <Upload onSuccess={setSpoilerLog}>Upload Spoiler Log</Upload>
                <Link
                    href="https://wiki.ootrandomizer.com/index.php?title=Frequently_Asked_Questions#How_Do_I_Find_My_Spoiler_Log_Again.3F"
                    isExternal
                    marginTop="0.5em"
                >
                    Where do I find this? <Icon name="external-link" mx="2px" />
                </Link>
            </Flex>
        );
    }

    return <Flex>hi</Flex>;
};

export default App;
