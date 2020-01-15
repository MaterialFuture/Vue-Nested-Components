<!--You can use this modal with whatever you want, it accepts slots for main and footer and accepts the parameter for name-->

<template>
    <div :id="name" class="overlay text-left">
        <a href="#" class="cancel"></a>
        <div class="container card">
            <div class="card-body">
                <div class="card-articles">
                    <slot></slot>
                </div>
                <footer class="flex mt-8">
                    <slot name="footer"></slot>
                    <a href="#" class="btn btn-secondary">Close this Window</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: ['name']
    }
</script>

<style scoped>
    .card-articles {
        max-height: 50em;
        overflow-y: scroll;
    }
    .overlay {
        visibility: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, .4);
        transition: opacity .3s;
        opacity: 0;
    }
    .overlay:target {
        visibility: visible;
        opacity: 1;
    }
    .modal .close {
        position: absolute;
        top: 15px;
        right: 15px;
        color: grey;
        text-decoration: none;
    }
    .overlay .cancel {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
