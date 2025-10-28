require "test_helper"

class KitControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get kit_index_url
    assert_response :success
  end

  test "should get buttons" do
    get kit_buttons_url
    assert_response :success
  end

  test "should get selects" do
    get kit_selects_url
    assert_response :success
  end

  test "should get inputs" do
    get kit_inputs_url
    assert_response :success
  end

  test "should get modals" do
    get kit_modals_url
    assert_response :success
  end

  test "should get forms" do
    get kit_forms_url
    assert_response :success
  end
end
