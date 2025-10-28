class KitController < ApplicationController
  layout 'kit'
  
  def index
  end

  def buttons
    render 'kit/buttons/index'
  end

  def selects
    render 'kit/selects/index'
  end

  def inputs
    render 'kit/inputs/index'
  end

  def modals
    render 'kit/modals/index'
  end

  def forms
    render 'kit/forms/index'
  end
end
