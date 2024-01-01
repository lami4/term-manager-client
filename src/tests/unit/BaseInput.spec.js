import BaseInput from '@/components/BaseInput.vue';
import { mount } from '@vue/test-utils'

test('Test if the asterisk is rendered if input is required', () => {
    const wrapper = mount(BaseInput, {
        propsData: {
            label: 'Test label',
            type: 'text',
            isRequired: true
        }
    })
    const label = wrapper.find('.base-input__label');
    expect(label.text()).toBe('Test label *');
})