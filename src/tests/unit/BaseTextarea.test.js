import BaseTextarea from '@/components/BaseTextarea.vue';
import { mount } from '@vue/test-utils'
import { addMacroTask } from '../helpers/UnitTestHelper';

const wrapper = mount(BaseTextarea, {
    propsData: {
        label: 'Test label',
        isRequired: false,
        value: 'Initial value'
    },
    attachTo: document.body
})

test('Test if BaseTextarea emits value on input', async () => {
    const input = wrapper.find('textarea');
    input.element.value = 'Updated value';
    await input.trigger('input');
    await expect(wrapper.emitted().input.length).toBe(1);
})

test('Test if the asterisk is rendered if textarea is required', async () => {
    const label = wrapper.find('.base-textarea__label');
    await expect(label.text()).toBe('Test label *');
})

test('Test if a required textarea without value is invalid', async () => {
    await wrapper.setProps({value: null});
    const validator = wrapper.findComponent({name: 'ValidationProvider'});
    await validator.vm.validate();
    await expect(!!validator.vm.failedRules.required).toBe(true);
})

test('Test if a required textarea without value has a tooltip saying it is invalid', async () => {
    await wrapper.setProps({value: null});
    await addMacroTask(() => {
        expect(document.body.querySelector('.v-popper__inner').textContent.includes('This field is required')).toBe(true);
    })
})