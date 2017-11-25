const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  if (ctx.path.startsWith('/shop_info')) {
    // ?shop_id=
    // GET
    ctx.body = {
      name: '鸟藏日料',
      header_img: 'https://tblg.k-img.com/restaurant/images/Rvw/17572/640x640_rect_17572599.jpg',
      location: '上海市徐汇区番禺路828号',
      phone: '021-62833218',
      bussiness_hour: '10:00 - 22:00',
      description: '上海第一家做河豚的店',
      show_images: [
        'https://tblg.k-img.com/restaurant/images/Rvw/17572/640x640_rect_17572599.jpg',
      ],
    }
  } else if (ctx.path.startsWith('/comment')) {
    // ?shop_id=123
    // POST
    comment = {
      rate: 4,
      user_id: 13,
    };

    // save comment
  } else {
    ctx.body = {
      user_name: '评论',
      rate: 4,
    }
  }
});

app.listen(8081, '0.0.0.0');
