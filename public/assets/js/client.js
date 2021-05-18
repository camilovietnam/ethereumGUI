let nodes = [];
let addresses = [];

$(function () {
  $("#btn-add-address").on("click", addNewAddress);

  $(document).on("click", ".btn-edit-address", openEditAddressModal);

  $(document).on("click", ".btn-delete-address", deleteAddressListItem);
});

function addNewAddress() {
  const newAddress = $("#input-address").val();

  if (newAddress === "") {
    return;
  }

  addresses.push(newAddress);

  rebuildAddressList();

  $("#input-address").val("");
}

function rebuildAddressList() {
  $("ul#list-addresses li").remove();

  addresses.forEach(function (address, index) {
    const newLisItem = $(buildAddressListItem(address, index));

    $("ul#list-addresses").append(newLisItem);
  });
}

function buildAddressListItem(address, index) {
  return `<li id="list-address-${index}">
                <strong>Address ${index}</strong>: 0 Ether&nbsp;
                <i class="fa fa-pencil mx-1 btn-edit-address"></i>
                <i class="fa fa-remove mx-1 btn-delete-address"></i>
                <button class="btn btn-secondary btn-sm btn-transfer" type="button">Transfer</button>
                <br>&nbsp; &nbsp;address: ${address}
            </li>`;
}

function deleteAddressListItem(event) {
  const listItem = $(event.currentTarget).parent("li");
  const idToDelete = listItem.get(0).id.replace("list-address-", "");

  addresses = addresses.filter(function (address, index) {
    return index != idToDelete;
  });

  rebuildAddressList();
}

function openEditAddressModal() {
  console.log("sdsd");
  $("#edit-account").modal("show");
}
