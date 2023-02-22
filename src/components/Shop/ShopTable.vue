<template>
  <v-container fluid>
    <div id="newentry">
      <div v-if="newentry7d.length > 0" id="newentry_7d">
        <v-row class="mb-1">
          <v-col class="text-start">
            <h2 class="display-1 font-weight-bold">มาใหม่</h2>
          </v-col>
          <v-col class="text-end mt-3">
            <h4
              v-if="newentry7d.length >= 4"
              class="display-1 text-go"
              @click="goToNewEntry"
            >
              ดูทั้งหมด
            </h4>
          </v-col>
        </v-row>
        <v-divider class="mb-6"></v-divider>
        <v-row>
          <v-col
            v-for="(item, index) in filteredNewEntry7D"
            :key="index"
            class="mb-5"
            md="3"
            sm="4"
            xs="6"
          >
            <v-card
              max-width="200"
              class="mx-auto cardHover"
              @click="showDetail(item)"
            >
              <v-img :src="item.imageBook" height="280px" cover />
              <v-card-title class="text-center pb-0" style="font-size: 15px">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle
                class="text-center grey--text"
                style="font-size: 12px"
              >
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
                <div style="display: inline-block; vertical-align: middle">
                  <v-rating
                    v-model="item.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="16"
                  />
                </div>
                <span
                  class="ml-2 text-grey-lighten-1 text-caption"
                  style="display: inline-block; vertical-align: middle"
                >
                  ({{ item.ratingsCount }} Rating)
                </span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="!checkHaveBook(item)"
                  class="btn-color"
                  @click.stop="addItem(item)"
                >
                  ฿ {{ item.price }}
                </v-btn>
                <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row class="mb-1">
          <v-col class="text-start">
            <h2 class="display-1 font-weight-bold">มาใหม่</h2>
          </v-col>
          <v-col class="text-end mt-3">
            <h4
              v-if="newentry.length >= 4"
              class="display-1 text-go"
              @click="goToNewEntry"
            >
              ดูทั้งหมด
            </h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(item, index) in filteredNewEntry"
            :key="index"
            class="mb-5"
            md="3"
            sm="4"
            xs="6"
          >
            <v-card
              max-width="200"
              class="mx-auto cardHover"
              @click="showDetail(item)"
            >
              <v-img :src="item.imageBook" height="280px" cover />
              <v-card-title class="text-center pb-0" style="font-size: 15px">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle
                class="text-center grey--text"
                style="font-size: 12px"
              >
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
                <div style="display: inline-block; vertical-align: middle">
                  <v-rating
                    v-model="item.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="16"
                  />
                </div>
                <span
                  class="ml-2 text-grey-lighten-1 text-caption"
                  style="display: inline-block; vertical-align: middle"
                >
                  ({{ item.ratingsCount }} Rating)
                </span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="!checkHaveBook(item)"
                  class="btn-color"
                  @click.stop="addItem(item)"
                >
                  ฿ {{ item.price }}
                </v-btn>
                <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="bestseller.length > 0" id="bestseller">
      <v-row class="mb-1">
        <v-col class="text-start">
          <h2 class="display-1 font-weight-bold">ขายดี</h2>
        </v-col>
        <v-col class="text-end mt-3">
          <h4
            v-if="bestseller.length >= 4"
            class="display-1 text-go"
            @click="goToBestSeller"
          >
            ดูทั้งหมด
          </h4>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row>
        <v-col
          v-for="(item, index) in filteredBestSell"
          :key="index"
          class="mb-5"
          md="3"
          sm="4"
          xs="6"
        >
          <v-card
            max-width="200"
            class="mx-auto cardHover"
            @click="showDetail(item)"
          >
            <v-img :src="item.imageBook" height="280px" cover>
              <v-img
                src="https://www.mebmarket.com/web/dist/assets/images/book-badge-B@2x.png"
                width="35"
                height="55"
                class="position-absolute"
                style="right: 0"
              ></v-img>
            </v-img>
            <v-card-title class="text-center pb-0" style="font-size: 15px">{{
              item.name
            }}</v-card-title>
            <v-card-subtitle
              class="text-center grey--text"
              style="font-size: 12px"
            >
              {{ item.author }} / {{ item.publisher }}
            </v-card-subtitle>
            <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
              <div style="display: inline-block; vertical-align: middle">
                <v-rating
                  v-model="item.rating"
                  color="#5a5a5a"
                  active-color="#e83e8c"
                  empty-icon="mdi-cards-heart"
                  full-icon="mdi-cards-heart"
                  readonly
                  hover
                  size="16"
                />
              </div>
              <span
                class="ml-2 text-grey-lighten-1 text-caption"
                style="display: inline-block; vertical-align: middle"
              >
                ({{ item.ratingsCount }} Rating)
              </span>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                v-if="!checkHaveBook(item)"
                class="btn-color"
                @click.stop="addItem(item)"
              >
                ฿ {{ item.price }}
              </v-btn>
              <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="halloffame.length > 0" id="halloffame">
      <v-row class="mb-1">
        <v-col class="text-start">
          <h2 class="display-1 font-weight-bold">ฮิตขึ้นหิ้ง</h2>
        </v-col>
        <v-col class="text-end mt-3">
          <h4
            v-if="halloffame.length >= 4"
            class="display-1 text-go"
            @click="goToHalloffame"
          >
            ดูทั้งหมด
          </h4>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row justify="start" align="start">
        <v-col
          v-for="(item, index) in filteredHalloffame"
          :key="index"
          class="mb-5"
          md="3"
          sm="4"
          xs="6"
        >
          <v-card
            max-width="200"
            class="mx-auto cardHover"
            @click="showDetail(item)"
          >
            <v-img :src="item.imageBook" height="280px" cover />
            <v-card-title class="text-center pb-0" style="font-size: 15px">{{
              item.name
            }}</v-card-title>
            <v-card-subtitle
              class="text-center grey--text"
              style="font-size: 12px"
            >
              {{ item.author }} / {{ item.publisher }}
            </v-card-subtitle>
            <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
              <div style="display: inline-block; vertical-align: middle">
                <v-rating
                  v-model="item.rating"
                  color="#5a5a5a"
                  active-color="#e83e8c"
                  empty-icon="mdi-cards-heart"
                  full-icon="mdi-cards-heart"
                  readonly
                  hover
                  size="16"
                />
              </div>
              <span
                class="ml-2 text-grey-lighten-1 text-caption"
                style="display: inline-block; vertical-align: middle"
              >
                ({{ item.ratingsCount }} Rating)
              </span>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                v-if="!checkHaveBook(item)"
                class="btn-color"
                @click.stop="addItem(item)"
              >
                ฿ {{ item.price }}
              </v-btn>
              <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="reviews.length > 0" id="all_review">
      <v-row class="mb-1">
        <v-col class="text-start">
          <h2 class="display-1 font-weight-bold">รีวิว</h2>
        </v-col>
        <v-col class="text-end mt-3">
          <h4 v-if="reviews.length >= 3" class="display-1 text-go" @click="goToNewEntry">ดูทั้งหมด</h4>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row class="mb-1">
        <v-col
          v-for="book in reviews.splice(0, 3)"
          :key="book._id"
          class="mb-5"
          md="4"
          sm="3"
          xs="2"
        >
          <v-card max-width="340" class="mx-auto bg-review-card" height="300">
              <div v-for="review in book.reviews.slice().reverse().splice(0,1)" :key="review._id">
                <v-card>
                  <v-row>
                    <v-col cols="12">
                      <p>comment "{{ review.comment }}"</p>
                    </v-col>
                    <v-col cols="12">
                      <p>{{ review.user.username }} rated {{ review.rating }}</p>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <v-img :src="book.imageBook" max-width="60" height="90" cover></v-img>
                  </v-col>
                  <v-col cols="7">
                    <v-row>
                      <v-col cols="12">
                        <p>{{ book.name }}</p>
                        <p>Author: {{ book.author }}</p>
                        <p>Category: {{ book.category }}</p>
                        <p>{{ book.rating }} คะแนน จาก {{ book.ratingsCount }}</p>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="recommend7d.length > 0 || recommend.length > 0" id="recommend">
      <div v-if="recommend7d.length > 0" id="recommend_7d">
        <v-row class="mb-1">
          <v-col class="text-start">
            <h2 class="display-1 font-weight-bold">แนะนำ</h2>
          </v-col>
          <v-col class="text-end mt-3">
            <h4
              v-if="recommend7d.length >= 4"
              class="display-1 text-go"
              @click="goToRecommend"
            >
              ดูทั้งหมด
            </h4>
          </v-col>
        </v-row>
        <v-divider class="mb-6"></v-divider>
        <v-row justify="start" align="start">
          <v-col
            v-for="(item, index) in filteredRecommend7D"
            :key="index"
            class="mb-5"
            md="3"
            sm="4"
            xs="6"
          >
            <v-card
              max-width="200"
              class="mx-auto cardHover"
              @click="showDetail(item)"
            >
              <v-img :src="item.imageBook" height="280px" cover />
              <v-card-title class="text-center pb-0" style="font-size: 15px">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle
                class="text-center grey--text"
                style="font-size: 12px"
              >
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-card-text
                class="text-center pb-0 pt-0"
                style="font-size: 13px"
              >
                <div style="display: inline-block; vertical-align: middle">
                  <v-rating
                    v-model="item.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="16"
                  />
                </div>
                <span
                  class="ml-2 text-grey-lighten-1 text-caption"
                  style="display: inline-block; vertical-align: middle"
                >
                  ({{ item.ratingsCount }} Rating)
                </span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="!checkHaveBook(item)"
                  class="btn-color"
                  @click.stop="addItem(item)"
                >
                  ฿ {{ item.price }}
                </v-btn>
                <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else id="recommend_all">
        <v-row class="mb-1">
          <v-col class="text-start">
            <h2 class="display-1 font-weight-bold">แนะนำ</h2>
          </v-col>
          <v-col class="text-end mt-3">
            <h4
              v-if="recommend.length >= 4"
              class="display-1 text-go"
              @click="goToRecommend"
            >
              ดูทั้งหมด
            </h4>
          </v-col>
        </v-row>
        <v-divider class="mb-6"></v-divider>
        <v-row justify="start" align="start">
          <v-col
            v-for="(item, index) in filteredRecommend"
            :key="index"
            class="mb-5"
            md="3"
            sm="4"
            xs="6"
          >
            <v-card
              max-width="200"
              class="mx-auto cardHover"
              @click="showDetail(item)"
            >
              <v-img :src="item.imageBook" height="280px" cover />
              <v-card-title class="text-center pb-0" style="font-size: 15px">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle
                class="text-center grey--text"
                style="font-size: 12px"
              >
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-card-text
                class="text-center pb-0 pt-0"
                style="font-size: 13px"
              >
                <div style="display: inline-block; vertical-align: middle">
                  <v-rating
                    v-model="item.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="16"
                  />
                </div>
                <span
                  class="ml-2 text-grey-lighten-1 text-caption"
                  style="display: inline-block; vertical-align: middle"
                >
                  ({{ item.ratingsCount }} Rating)
                </span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="!checkHaveBook(item)"
                  class="btn-color"
                  @click.stop="addItem(item)"
                >
                  ฿ {{ item.price }}
                </v-btn>
                <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-else>
      <div v-if="newentry7d.length > 0" id="newentry_7d">
        <v-row class="mb-1">
          <v-col class="text-start">
            <h2 class="display-1 font-weight-bold">มาใหม่</h2>
          </v-col>
          <v-col class="text-end mt-3">
            <h4
              v-if="newentry7d.length >= 4"
              class="display-1 text-go"
              @click="goToNewEntry"
            >
              ดูทั้งหมด
            </h4>
          </v-col>
        </v-row>
        <v-divider class="mb-6"></v-divider>
        <v-row>
          <v-col
            v-for="(item, index) in filteredNewEntry7D"
            :key="index"
            class="mb-5"
            md="3"
            sm="4"
            xs="6"
          >
            <v-card
              max-width="200"
              class="mx-auto cardHover"
              @click="showDetail(item)"
            >
              <v-img :src="item.imageBook" height="280px" cover />
              <v-card-title class="text-center pb-0" style="font-size: 15px">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle
                class="text-center grey--text"
                style="font-size: 12px"
              >
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
                <div style="display: inline-block; vertical-align: middle">
                  <v-rating
                    v-model="item.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="16"
                  />
                </div>
                <span
                  class="ml-2 text-grey-lighten-1 text-caption"
                  style="display: inline-block; vertical-align: middle"
                >
                  ({{ item.ratingsCount }} Rating)
                </span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="!checkHaveBook(item)"
                  class="btn-color"
                  @click.stop="addItem(item)"
                >
                  ฿ {{ item.price }}
                </v-btn>
                <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row class="mb-1">
          <v-col class="text-start">
            <h2 class="display-1 font-weight-bold">แนะนำ</h2>
          </v-col>
          <v-col class="text-end mt-3">
            <h4
              v-if="newentry.length >= 4"
              class="display-1 text-go"
              @click="goToNewEntry"
            >
              ดูทั้งหมด
            </h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(item, index) in filteredNewEntry"
            :key="index"
            class="mb-5"
            md="3"
            sm="4"
            xs="6"
          >
            <v-card
              max-width="200"
              class="mx-auto cardHover"
              @click="showDetail(item)"
            >
              <v-img :src="item.imageBook" height="280px" cover />
              <v-card-title class="text-center pb-0" style="font-size: 15px">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle
                class="text-center grey--text"
                style="font-size: 12px"
              >
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
                <div style="display: inline-block; vertical-align: middle">
                  <v-rating
                    v-model="item.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="16"
                  />
                </div>
                <span
                  class="ml-2 text-grey-lighten-1 text-caption"
                  style="display: inline-block; vertical-align: middle"
                >
                  ({{ item.ratingsCount }} Rating)
                </span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="!checkHaveBook(item)"
                  class="btn-color"
                  @click.stop="addItem(item)"
                >
                  ฿ {{ item.price }}
                </v-btn>
                <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <v-dialog v-model="showModal" max-width="500px">
      <v-card max-width="400px" class="pa-4">
        <div class="d-flex justify-end pa-0">
          <v-icon @click="hideModal">mdi-close</v-icon>
        </div>
        <v-card-title primary-title class="text-center pa-1">
          เพิ่มหนังสือลงตะกร้าแล้ว
        </v-card-title>
        <v-divider></v-divider>
        <v-container class="pa-2">
          <v-card-actions>
            <v-btn
              class="btn-bg"
              type="submit"
              block
              variant="outlined"
              @click="goToHome"
              >เลือกซื้อหนังสือเล่มอื่นต่อ
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              class="btn-bg1"
              type="submit"
              block
              variant="elevated"
              @click="goToCart"
              >ชำระเงิน
            </v-btn>
          </v-card-actions>
        </v-container>
        <v-divider></v-divider>
        <v-container class="pa-2">
          <v-card-actions>
            <v-btn
              class="btn-bg2"
              type="submit"
              block
              variant="elevated"
              @click="goToCoin"
              >เติม COIN
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import router from "@/router";
import api from "@/services/api";

export default {
  name: "ShopTable",
  data() {
    return {
      bestseller: [],
      newentry: [],
      newentry7d: [],
      recommend: [],
      recommend7d: [],
      halloffame: [],
      myBook: [],
      reviews: [],
      showModal: false,
      screenWidth: 0,
    };
  },
  methods: {
    goToHome() {
      this.showModal = false;
      router.push("/");
    },
    goToCart() {
      this.showModal = false;
      router.push("/cart");
    },
    goToCoin() {
      this.showModal = false;
      router.push("/coin");
    },
    goToRecommend() {
      router.push("/recommend");
    },
    goToBestSeller() {
      router.push("/bestseller");
    },
    goToNewEntry() {
      router.push("/newentry");
    },
    goToHalloffame() {
      router.push("/halloffame");
    },
    hideModal() {
      this.showModal = !this.showModal;
    },
    showDetail(item) {
      this.$router.push(`/book/${item._id}`);
    },
    getAllReview() {
      api.get("/allreview/books/reviews/").then((result) => {
        this.reviews = result.data;
      });
    },
    alertWarning() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "กรุณาเข้าสู่ระบบก่อนนำหนังสือเข้าตะกร้าด้วยจ้า",
        icon: "warning",
        button: "OK",
      });
    },
    alertSuccess() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "คุณมีหนังสือนี้ในตะกร้าแล้ว",
        icon: "warning",
        button: "OK",
      });
    },
    async addItem(item) {
      if (this.isLogin) {
        const res = await api.post(
          "/cart/" + this.getId() + "/books/" + item._id
        );
        if (
          res.status === 200 &&
          res.data.message === "You have this product in your cart"
        ) {
          this.alertSuccess();
        } else {
          this.showModal = true;
          this.getCartList();
        }
      } else {
        this.alertWarning();
      }
    },
    getNewEntry7D() {
      api.get("/newentry/new/").then((result) => {
        this.newentry7d = result.data;
      });
    },
    getNewEntry() {
      api.get("/newentry/").then((result) => {
        this.newentry = result.data;
      });
    },
    getBestseller() {
      api.get("/bestseller/").then((result) => {
        this.bestseller = result.data;
      });
    },
    getRecommend() {
      api.get("/recommended/").then((result) => {
        this.recommend = result.data;
      });
    },
    getRecommend7d() {
      api.get("/recommended/new").then((result) => {
        this.recommend7d = result.data;
      });
    },
    getHalloffame() {
      api.get("/halloffame/").then((result) => {
        this.halloffame = result.data;
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        this.cartList = result.data.items;
        this.$store.dispatch("cartList/setCartList", this.cartList);
      });
    },
    async getMyBook() {
      const res = await api.get("/inventory/" + this.getId());
      this.myBook = res.data;
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    checkHaveBook() {
      return (item) => {
        return this.myBook.some((book) => book._id === item._id);
      };
    },
    filteredNewEntry() {
      if (this.screenWidth > 960) {
        return this.newentry.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.newentry.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.newentry.slice(0, 2);
      } else {
        return this.newentry.slice(0, 2);
      }
    },
    filteredNewEntry7D() {
      if (this.screenWidth > 960) {
        return this.newentry7d.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.newentry7d.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.newentry7d.slice(0, 2);
      } else {
        return this.newentry7d.slice(0, 2);
      }
    },
    filteredBestSell() {
      if (this.screenWidth > 960) {
        return this.bestseller.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.bestseller.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.bestseller.slice(0, 2);
      } else {
        return this.bestseller.slice(0, 2);
      }
    },
    filteredHalloffame() {
      if (this.screenWidth > 960) {
        return this.halloffame.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.halloffame.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.halloffame.slice(0, 2);
      } else {
        return this.halloffame.slice(0, 2);
      }
    },
    filteredRecommend() {
      if (this.screenWidth > 960) {
        return this.recommend.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.recommend.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.recommend.slice(0, 2);
      } else {
        return this.recommend.slice(0, 2);
      }
    },
    filteredRecommend7D() {
      if (this.screenWidth > 960) {
        return this.recommend7d.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.recommend7d.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.recommend7d.slice(0, 2);
      } else {
        return this.recommend7d.slice(0, 2);
      }
    },
  },
  watch: {
    showModal(newValue) {
      if (newValue) {
        document.body.classList.add("dialog-open");
      } else {
        document.body.classList.remove("dialog-open");
      }
    },
    isLogin(newValue) {
      if (!newValue) {
        this.myBook = [];
        this.getBestseller();
        this.getNewEntry();
        this.getHalloffame();
        this.getRecommend();
        this.getNewEntry7D();
        this.getRecommend7d();
        this.getAllReview();
      } else {
        this.getBestseller();
        this.getNewEntry();
        this.getHalloffame();
        this.getRecommend();
        this.getNewEntry7D();
        this.getRecommend7d();
        this.getAllReview();
        this.getMyBook();
      }
    },
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    this.getBestseller();
    this.getNewEntry();
    this.getHalloffame();
    this.getRecommend();
    this.getNewEntry7D();
    this.getRecommend7d();
    this.getAllReview();
    if (this.isLogin) {
      this.getMyBook();
      this.getAllReview();
    }
  },
};
</script>

<style scoped>
.text-go {
  cursor: pointer;
  color: #00af70;
}
.btn-color {
  color: #fff;
  background-color: #00af70;
}
.btn-color:hover {
  background-color: gray !important;
}
.cardHover:hover {
  border: 1px solid #00af70;
  cursor: pointer;
}
.position-absolute {
  position: absolute;
}
.btn-bg {
  border-radius: 40px;
  font-size: 16px;
}
.btn-bg1 {
  color: #fff;
  background-color: #00af70;
  border-radius: 40px;
  font-size: 16px;
}
.btn-bg2 {
  color: #fff;
  background-color: #f58b1b;
  border-radius: 40px;
  font-size: 16px;
}
.bg-review-card {
  background-color: #f6f6f6;
}
</style>
