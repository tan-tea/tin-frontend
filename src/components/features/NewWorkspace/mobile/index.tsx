'use client'

import {
    useState,
    type FC,
} from 'react';

import {
    Box,
    Field,
} from 'ui/index';

import BackButton from 'common/BackButton';

import { NewWorkspaceProps, } from 'feature/NewWorkspace';

type NewWorkspaceMobileProps = NewWorkspaceProps;

const NewWorkspaceMobile: FC<NewWorkspaceMobileProps> = (
    props: NewWorkspaceMobileProps
) => {
    const {
        t,
        navigation,
    } = props;

    const [example, setExample] = useState<string>('');

    return (
        <Box
            component='section'
            className='h-dvh w-full overflow-hidden'
        >
            <Box className='size-full flex flex-col'>
                <Box>
                    <BackButton className='relative ml-4 mt-4'/>
                </Box>
                <Box className='grow p-4 flex flex-col'>
                    <Field
                        fullWidth
                        label='Email Address'
                        placeholder='Type here'
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default NewWorkspaceMobile;
