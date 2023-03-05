<template>
  <v-container fluid>
    <div v-if="!isLogin" id="menu">
      <v-row>
        <v-col lg="4" md="4" sm="12" class="mb-4">
          <v-card
            @click="toggleModalRegister"
            class="mx-auto bg-card"
            max-width="300"
          >
            <v-container>
              <div class="text-card-center">
                <v-icon class="mr-3">mdi-account-plus</v-icon>
                <h3>สมัครอ่านหนังสือ</h3>
              </div>
              <div class="text-card-center">
                <p>ง่ายสุด เยอะสุด สนุกสุด</p>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="4" md="4" sm="12" class="mb-4">
          <v-card @click="goToAllBooks" class="mx-auto bg-card" max-width="300">
            <v-container>
              <div class="text-card-center">
                <v-icon class="mr-3">mdi-book-open-blank-variant</v-icon>
                <h3>ดูหนังสือทั้งหมด</h3>
              </div>
              <div class="text-card-center">
                <p>เลือกดูหนังสือทุกเล่มที่วางขาย</p>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="4" md="4" sm="12" class="mb-4">
          <v-card
            @click="goToRecommend"
            class="mx-auto bg-card"
            max-width="300"
          >
            <v-container>
              <div class="text-card-center">
                <v-icon class="mr-3">mdi-thumb-up</v-icon>
                <h3>หนังสือแนะนำ</h3>
              </div>
              <div class="text-card-center">
                <p>เลือกดูหนังสือที่น่าสนใจ</p>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div :class="isLogin ? '' : 'mt-10'" id="newentry">
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

    <div v-if="reviews.length > 0" id="all_review">
      <v-row class="mb-1">
        <v-col class="text-start">
          <h2 class="display-1 font-weight-bold">รีวิว</h2>
        </v-col>
        <v-col class="text-end mt-3">
          <h4
            v-if="reviews.length >= 3"
            class="display-1 text-go"
            @click="goToNewEntry"
          >
            ดูทั้งหมด
          </h4>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row class="mb-1">
        <v-col
          v-for="(book, index) in filteredReviews"
          :key="index"
          class="mb-5"
          md="4"
          sm="3"
          xs="2"
        >
          <v-card max-width="340" class="mx-auto bg-review-card" height="360">
            <div
              v-for="(review, index) in book.reviews
                .slice()
                .reverse()
                .splice(0, 1)"
              :key="index"
            >
              <v-card>
                <v-row class="ma-2">
                  <v-col cols="12">
                    <p class="review-comment">{{ review.comment }}</p>
                    <p class="text-show-all" @click="hidereview(review)">
                      แสดงทั้งหมด
                    </p>
                  </v-col>
                  <v-card-subtitle class="subtitle-2 text-uppercase"
                    >รีวิวจาก
                  </v-card-subtitle>
                  <v-col cols="12">
                    <p>{{ review.user.name }}</p>
                    <div style="font-size: 10px">
                      <v-rating
                        v-model="review.rating"
                        color="#5a5a5a"
                        active-color="#e83e8c"
                        empty-icon="mdi-cards-heart"
                        full-icon="mdi-cards-heart"
                        readonly
                        hover
                        size="16"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-img
                    :src="book.imageBook"
                    max-width="60"
                    height="90"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="7">
                  <v-row>
                    <v-col cols="12">
                      <p style="font-size: 16px; font-weight: bold">
                        {{ book.name }}
                      </p>
                      <p style="font-size: 12px">Author: {{ book.author }}</p>
                      <p style="font-size: 12px">
                        Category: {{ book.category }}
                      </p>
                      <p style="font-size: 12px; color: red">
                        {{ book.rating }} คะแนน จาก {{ book.ratingsCount }}
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
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
            <h2 class="display-1 font-weight-bold">แนะนำ</h2>
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

  <v-dialog v-model="showReview" max-width="600px">
    <v-card max-width="400px" class="pa-4">
      <div class="d-flex justify-end pa-0">
        <v-icon @click="showReview = false">mdi-close</v-icon>
      </div>
      <p class="text-h6">{{ displayName }}</p>
      <v-divider class="my-2"></v-divider>
      <p>{{ userComment }}</p>
      <div class="my-1">
        <span>Rating: </span>
        <span style="font-size: 10px">
          <v-rating
            v-model="userRating"
            color="#5a5a5a"
            active-color="#e83e8c"
            empty-icon="mdi-cards-heart"
            full-icon="mdi-cards-heart"
            readonly
            hover
            size="16"
          />
        </span>
      </div>
    </v-card>
  </v-dialog>

  <Login
    :visibleModal="visibleModal"
    @update:isVisible="visibleModal = $event"
  />

  <Register
    :registerModal="registerModal"
    @update:isVisible="registerModal = $event"
  />
</template>

<script>
import router from "@/router";
import api from "@/services/api";
import Login from "@/views/User/Login.vue";
import Register from "@/views/User/Register.vue";
import io from "socket.io-client";

export default {
  name: "ShopTable",
  components: {
    Login,
    Register,
  },
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
      showReview: false,
      screenWidth: 0,
      visibleModal: false,
      registerModal: false,
      displayName: "",
      userComment: "",
      userRating: 0,
      showFullText: false,
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    toggleLoginModal() {
      this.visibleModal = !this.visibleModal;
    },
    toggleModalRegister() {
      this.registerModal = !this.registerModal;
    },
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
    goToAllBooks() {
      router.push("/books/all");
    },
    hideModal() {
      this.showModal = !this.showModal;
    },
    hidereview(review) {
      this.displayName = review.user.name;
      this.userComment = review.comment;
      this.userRating = review.rating;
      this.showReview = true;
    },
    showDetail(item) {
      this.$router.push(`/book/${item._id}`);
    },
    alertWarning() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "กรุณาเข้าสู่ระบบก่อนนำหนังสือเข้าตะกร้าด้วยจ้า",
        icon: "warning",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          this.toggleLoginModal();
        }
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
        confirmButtonText: "OK",
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
    async getAllReview() {
      const res = await api.get("/allreview/books/reviews/");
      this.reviews = res.data;
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
    filteredReviews() {
      return this.reviews.slice(0, 3);
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
        this.visibleModal = false;
        this.getAllReview();
        this.getBestseller();
        this.getNewEntry();
        this.getHalloffame();
        this.getRecommend();
        this.getNewEntry7D();
        this.getRecommend7d();
      } else {
        this.visibleModal = false;
        this.getAllReview();
        this.getBestseller();
        this.getNewEntry();
        this.getHalloffame();
        this.getRecommend();
        this.getNewEntry7D();
        this.getRecommend7d();
        this.getMyBook();
      }
    },
  },
  mounted() {
    this.visibleModal = false;
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    this.getAllReview();
    this.getBestseller();
    this.getNewEntry();
    this.getHalloffame();
    this.getRecommend();
    this.getNewEntry7D();
    this.getRecommend7d();
    if (this.isLogin) {
      this.visibleModal = false;
      this.getMyBook();
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("new-rating", () => {
      this.getAllReview();
      this.getBestseller();
      this.getNewEntry();
      this.getHalloffame();
      this.getRecommend();
      this.getNewEntry7D();
      this.getRecommend7d();
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("product-sell", () => {
      this.getAllReview();
      this.getBestseller();
      this.getNewEntry();
      this.getHalloffame();
      this.getRecommend();
      this.getNewEntry7D();
      this.getRecommend7d();
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("update-book-edit", () => {
      this.getAllReview();
      this.getBestseller();
      this.getNewEntry();
      this.getHalloffame();
      this.getRecommend();
      this.getNewEntry7D();
      this.getRecommend7d();
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("update-book-delete", () => {
      this.getAllReview();
      this.getBestseller();
      this.getNewEntry();
      this.getHalloffame();
      this.getRecommend();
      this.getNewEntry7D();
      this.getRecommend7d();
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("upload-image-book", () => {
      this.getAllReview();
      this.getBestseller();
      this.getNewEntry();
      this.getHalloffame();
      this.getRecommend();
      this.getNewEntry7D();
      this.getRecommend7d();
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("upload-pdf-book", () => {
      this.getAllReview();
      this.getBestseller();
      this.getNewEntry();
      this.getHalloffame();
      this.getRecommend();
      this.getNewEntry7D();
      this.getRecommend7d();
      if (this.isLogin) {
        this.getMyBook();
      }
    });
  },
};
</script>

<style scoped>
.bg-card {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
  cursor: pointer;
}
.bg-card:hover {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
}
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
.text-card-center {
  display: flex;
  justify-content: center;
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
.review-comment {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-show-all {
  font-size: 16px;
  line-height: 1.5;
  color: #39b449;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
