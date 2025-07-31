import { invoke } from '@withease/factories';
import { sample } from 'effector';
import { createGate } from 'effector-react';

import { atom, virtualKeyboardFactory } from '@/shared/factories';

export const TestModel = atom(() => {
    const TestModelGate = createGate();

    const { $opened, setupEffectFx, clearEffectFx, $supported } = invoke(virtualKeyboardFactory, {
        initialValue: false,
    });

    sample({
        clock: TestModelGate.open,
        target: setupEffectFx,
    });
    sample({
        clock: TestModelGate.close,
        target: clearEffectFx,
    });

    return {
        TestModelGate,
        $opened,
        $supported,
    };
});
