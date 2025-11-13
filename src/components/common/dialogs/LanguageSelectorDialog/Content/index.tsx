'use client'

import {
    useMemo,
    type FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Text,
} from 'ui/index';
import {
    En,
    Es,
} from 'icons/index';

import { ApplicationLanguage, } from 'shared/stores/application-store/types';

import LanguageOptionCard, {
    LanguageOption,
} from 'common/LanguageOptionCard';

type LanguageSelectorDialogContentProps = {
    t: ReturnType<typeof useTranslations>;
    currentLanguage: ApplicationLanguage;
    onSelectLanguage: (language: ApplicationLanguage) => void;
};

const LanguageSelectorDialogContent: FC<LanguageSelectorDialogContentProps> = (
    props: LanguageSelectorDialogContentProps,
) => {
    const {
        t,
        currentLanguage,
        onSelectLanguage,
    } = props;

    const handleSelectOption = (
        value: ApplicationLanguage
    ) => onSelectLanguage && onSelectLanguage(value);

    const languageOptions: Array<LanguageOption> = useMemo(
        () => [
            {
                icon: <En/>,
                title: t('language.dialog.en.title'),
                value: 'en',
                selected: currentLanguage === 'en',
                onSelectOption: handleSelectOption,
            },
            {
                icon: <Es/>,
                title: t('language.dialog.es.title'),
                value: 'es',
                selected: currentLanguage === 'es',
                onSelectOption: handleSelectOption,
            },
        ] as Array<LanguageOption>,
        [t, currentLanguage, handleSelectOption,],
    );

    const description = t('language.dialog.description');

    return (
        <Box className='size-full flex flex-col gap-y-6'>
            {description && (
                <Text
                    variant='body2'
                    component='p'
                    className='text-xs text-center md:text-left md:text-sm text-gray-800'
                >
                    {description}
                </Text>
            )}
            <Box className='w-full flex flex-col md:flex-row gap-x-6 gap-y-4 flex-wrap overflow-hidden'>
                {languageOptions && languageOptions?.map?.(
                    (option) => <LanguageOptionCard key={option?.title} {...option}/>
                )}
            </Box>
        </Box>
    );
};

export default LanguageSelectorDialogContent;
