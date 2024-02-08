import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "John",
      email: "jtlovato@rsyte.com",
      password: bcrypt.hashSync("Sakic9219"),
      isAdmin: true,
    },
    {
      name: "Ayodele",
      email: "aro1871@gmail.com",
      password: bcrypt.hashSync("Dazzling87!"),
      isAdmin: true,
    },
  ],
  infos: [
    {
      title: "Why Elono Musko Sucks Dick",
      slug: "why-elono-musko-sucks-dick",
      type: "blog",
      image: "/images/p1.jpg",
      description:
        "perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,",
      source: "",
      info: "Sed ddddut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    },
    {
      title: "Why Elon Dicky",
      slug: "why-elon-dicky",
      type: "podcast",
      image: "/images/p1.jpg",
      description:
        "perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,",
      source: "",
      info: "THINGS",
    },
    {
      title: "Musk Sucka",
      slug: "musk-sucka",
      type: "video",
      image: "/images/p1.jpg",
      description:
        "perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,",
      source: "",
      info: "MORE THINGS",
    },
    {
      title: "Why Elono Musko Sucks Dick2",
      slug: "why-elono-musko-sucks-dick2",
      type: "blog",
      image: "/images/p1.jpg",
      description:
        "perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,",
      source: "",
      info: "Sed ddddut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    },
    {
      title: "Why Elon Dicky2",
      slug: "why-elon-dicky2",
      type: "podcast",
      image: "/images/p1.jpg",
      description:
        "perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,",
      source: "",
      info: "MORE THINGS",
    },
    {
      title: "Musk Sucka2",
      slug: "musk-sucka2",
      type: "video",
      image: "/images/p1.jpg",
      description:
        "perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,",
      source: "https://player.vimeo.com/video/911011188",
      info: "LAST THINGS",
    },
  ],
  products: [
    {
      // _id: "1",
      name: "Nike Slim shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg", // 679px × 829px
      price: 120,
      countInStock: 100,
      description: "high quality shirt",
      // hightlight: "false",
    },
    {
      // _id: "1",
      name: "Ass Slim shirt",
      slug: "nikeAss-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg", // 679px × 829px
      price: 1,
      countInStock: 10,
      description: "high quality shirt",
      // hightlight: false,
    },
    {
      // _id: "2",
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 250,
      countInStock: 200,
      description: "high quality product",
      // hightlight: true,
    },
    {
      // _id: "3",
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/p3.jpg",
      price: 25,
      countInStock: 150,
      description: "high quality product",
      // hightlight: false,
    },
    {
      // _id: "4",
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 65,
      countInStock: 50,
      description: "high quality product",
      // hightlight: false,
    },
  ],
};
export default data;
