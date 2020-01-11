import firebase from "firebase/app";
import "firebase/storage";
import moment from "moment";
import natural from "natural";
import { flatten, orderBy, sortBy, groupBy, mapValues, filter } from "lodash";
import { db, WhereCondition, WHERE_OPERATORS, OrderCondition, ORDER_OPERATORS } from "./database";
import { fetchJson } from "./utils";


const storage = firebase.storage();

export async function getAllEventMinutesItems() {
    try {
        const allMinutesItems = await db.selectRowsAsArray(
            "minutes_item",
            [new WhereCondition(["matter", WHERE_OPERATORS.gteq, ""])],
           null,
            20
        );

        //const bills = await getAllBills(allMinutesItems);
        return allMinutesItems;
    } catch (e) {
        return Promise.reject(e);
    }
}


/**
 * @param {Object[]} eventMinutesItems The list of event minute items.
 * @return {Object[]} The formatted list of minutes items (bills) with basic information for front-end.
 */
async function getAllBills(minutesItems) {
    //const allMinutesItems = await getAllMinutesItems();

    const eventMinutesItems = await Promise.all(
        minutesItems.map(minutesItem => db.selectRowById("event_minutes_item", minutesItem.id))
    );
    let mergedBills = [];
    for (let i = 0; i < eventMinutesItems.length; i++) {
        let eventMinutesItem = eventMinutesItems[i];
        let bill = minutesItems[i];
        let mergedBill = {
            minutes_item_id: bill.id,
            event_minutes_item_id: eventMinutesItem.event_minutes_item_id,
            index: eventMinutesItem.index,
            event_id: eventMinutesItem.event_id,
            name: bill.name,
            matter: eventMinutesItem.matter,
            decision: eventMinutesItem.decision,
            created: moment
                .utc(bill.created.toMillis())
                .toISOString()
        };
        mergedBills.push(mergedBill);
    }
    return mergedBills;

}

export async function getAllMinutesItems() {
    try {
        return db.selectRowsAsArray(
            'minutes_item',
            [],
            new OrderCondition(['created', ORDER_OPERATORS.asc])
        );
    } catch (e) {
        return Promise.reject(e);
    }
}