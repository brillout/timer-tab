import {render_view} from './render_view';

export {onPageLoad};

async function onPageLoad(load_common, goldpage_args) {
    render_view(goldpage_args);
    load_common();
}