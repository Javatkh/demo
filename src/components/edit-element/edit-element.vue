<!-- 可编辑的元素 -->
<template>
  <div
    class="edit-element"
    :class="{editing: edit, focused: focus}"
    v-html="innerText"
    :contenteditable="edit"
    :spellcheck="edit"
    @focus="onFocus"
    @blur="onBlur"
    @input="changeText"
    @keydown="keyDown">
  </div>
</template>

<script>
  export default {
    name: "edit-element",
    computed: {},
    props: {
      value: {
        type: String,
        default: ''
      },
      edit: {
        type: Boolean,
        default: true
      },
      // @特殊处理 针对引用传递的优化
      name: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        focus: false,
        innerText: this.value,
        isLocked: false
      }
    },
    watch: {
      'value'() {
        if (!this.isLocked || !this.innerText) {
          this.innerText = this.value;
        }
      }
    },
    methods: {
      changeText(event) {
        this.$emit('input', this.$el.innerHTML, this, this.data);
      },
      onFocus() {
        this.isLocked = true
        this.focus = true;
      },
      onBlur() {
        this.isLocked = false
        this.focus = false;
      },
      enter() {
        this.$emit('enter', this.$el.innerHTML, this.edit);
      },
      keyDown(event) {
        // @特殊处理, 禁止换行
        if (event.keyCode === 13) {
          event.preventDefault()
          event.stopPropagation()
          this.enter()
        }
      }
    }
  };
</script>

<style>
  .edit-element {
    outline: none;
    user-select: text;     /* 可以选择文本 */
    white-space: pre-wrap; /* 保留空白符序列，但是正常地进行换行。 */
    word-wrap: break-word; /* 在长单词或 URL 地址内部进行换行。 */
    word-break: break-all; /* 允许在单词内换行 */
    cursor: default;
  }

  .edit-element.editing {
    cursor: text;
  }

  .edit-element.focused {

  }

  .edit-element[contenteditable=true] {
    user-modify: read-write-plaintext-only;         /* 纯文本 */
    -webkit-user-modify: read-write-plaintext-only; /* 纯文本 */
    -moz-user-modify: read-write-plaintext-only;    /* 纯文本 */
  }
</style>
